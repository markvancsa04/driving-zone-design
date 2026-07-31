import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Star, Car } from "lucide-react";
import { ImagePlaceholder } from "@/components/Placeholder";
import { Section, SectionHeader } from "@/components/Section";
import { HeroSlider } from "@/components/HeroSlider";
import { CmsLink } from "@/components/CmsLink";
import { SocialLinks } from "@/components/SocialLinks";
import { pageBySlug, setting, siteContentQuery, useSiteContent } from "@/lib/cms";

export const Route = createFileRoute("/")({
  loader: async ({ context }) => {
    const content = await context.queryClient.ensureQueryData(siteContentQuery);
    return { page: pageBySlug(content, "/"), settings: content.settings };
  },
  head: ({ loaderData }) => {
    const s = loaderData?.settings ?? {};
    const title = loaderData?.page.meta_title || s["hero_title"] || "Driving Zone";
    const description = loaderData?.page.meta_description || s["hero_subtitle"] || "";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: HomePage,
});

function HomePage() {
  const content = useSiteContent();
  const services = content.services.filter((s) => s.show_on_home);
  const instructors = content.instructors.filter((i) => i.show_on_home);
  const reviews = content.reviews.filter((r) => r.show_on_home);
  const gallery = content.gallery.slice(0, 4);

  return (
    <>
      <HeroSlider />

      {/* SERVICES PREVIEW */}
      <Section>
        <SectionHeader
          eyebrow={setting(content, "home_services_eyebrow")}
          title={setting(content, "home_services_title")}
          intro={setting(content, "home_services_intro")}
        />
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <article key={service.id} className="card-lift rounded-3xl border border-border bg-card p-8">
              <div className="h-12 w-12 rounded-2xl bg-brand-soft grid place-items-center text-brand mb-6">
                <Car className="size-5" />
              </div>
              <h3 className="text-xl font-semibold text-ink">{service.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{service.description}</p>
              <div className="mt-6 text-sm font-semibold text-brand">{service.price}</div>
            </article>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <CmsLink href="/szolgaltatasok" className="btn-ghost">
            {setting(content, "home_services_cta_text")} <ArrowRight className="size-4" />
          </CmsLink>
        </div>
      </Section>

      {/* INSTRUCTORS PREVIEW */}
      <Section className="bg-secondary/40 max-w-none px-0">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeader
            eyebrow={setting(content, "home_instructors_eyebrow")}
            title={setting(content, "home_instructors_title")}
            intro={setting(content, "home_instructors_intro")}
          />
          <div className="grid gap-6 md:grid-cols-2">
            {instructors.map((instructor) => (
              <article key={instructor.id} className="card-lift rounded-3xl overflow-hidden bg-card border border-border">
                <ImagePlaceholder
                  label="[Oktató fotó]"
                  className="aspect-[16/10] rounded-none border-0 border-b border-border"
                  src={instructor.image_url}
                  alt={instructor.name}
                />
                <div className="p-8">
                  <h3 className="text-xl font-semibold text-ink">
                    {instructor.name}
                    {instructor.role ? ` - ${instructor.role.toLowerCase()}` : ""}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{instructor.bio}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <CmsLink href="/oktatok" className="btn-ghost">
              {setting(content, "home_instructors_cta_text")} <ArrowRight className="size-4" />
            </CmsLink>
          </div>
        </div>
      </Section>

      {/* CARS PREVIEW */}
      <Section id="autok">
        <SectionHeader
          eyebrow={setting(content, "home_cars_eyebrow")}
          title={setting(content, "home_cars_title")}
          intro={setting(content, "home_cars_intro")}
        />
        <div className="grid gap-6 md:grid-cols-2">
          {content.cars.map((car) => (
            <article key={car.id} className="card-lift rounded-3xl overflow-hidden bg-card border border-border">
              <ImagePlaceholder
                label={car.model}
                className="aspect-[16/10] rounded-none border-0 border-b border-border"
                src={car.image_url}
                alt={`Driving Zone oktatóautó – ${car.model}`}
              />
              <div className="p-8">
                <h3 className="text-xl font-semibold text-ink">{car.model}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{car.description}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* WALL OF FAME PREVIEW */}
      <Section className="bg-secondary/40 max-w-none px-0">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeader
            eyebrow={setting(content, "home_gallery_eyebrow")}
            title={setting(content, "home_gallery_title")}
            intro={setting(content, "home_gallery_intro")}
          />
          <SocialLinks className="mb-10 -mt-4" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {gallery.map((image, i) => (
              <ImagePlaceholder
                key={image.id}
                label={`Siker ${i + 1}`}
                className="aspect-square rounded-3xl"
                src={image.image_url}
                alt={image.alt || `Driving Zone sikeres diák ${i + 1}`}
              />
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <CmsLink href="/sikereink" className="btn-ghost">
              {setting(content, "home_gallery_cta_text")} <ArrowRight className="size-4" />
            </CmsLink>
          </div>
        </div>
      </Section>

      {/* REVIEWS PREVIEW */}
      <Section>
        <SectionHeader
          eyebrow={setting(content, "home_reviews_eyebrow")}
          title={setting(content, "home_reviews_title")}
          intro={setting(content, "home_reviews_intro")}
        />
        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <article key={review.id} className="card-lift rounded-3xl border border-border bg-card p-8">
              <div className="flex gap-1 text-brand mb-4">
                {Array.from({ length: review.rating || 5 }).map((_, k) => (
                  <Star key={k} className="size-4 fill-current" />
                ))}
              </div>
              <p className="text-sm text-ink leading-relaxed">{review.text}</p>
              <div className="mt-6">
                <div className="text-sm font-semibold text-ink">{review.name}</div>
                <div className="text-xs text-muted-foreground">{review.age}</div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <CmsLink href="/velemenyek" className="btn-ghost">
            {setting(content, "home_reviews_cta_text")} <ArrowRight className="size-4" />
          </CmsLink>
        </div>
      </Section>
    </>
  );
}
