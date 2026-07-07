import Image from "next/image";
import Container from "../ui/Container";

const gallery = [
  "/images/gallery/gallery1.jpg",
  "/images/gallery/gallery2.jpg",
  "/images/gallery/gallery3.jpg",
  "/images/gallery/gallery4.jpg",
  "/images/gallery/gallery5.jpg",
  "/images/gallery/gallery6.jpg",
];

export default function Gallery() {
  return (
    <section id="gallery" className="bg-[#080808] py-24 text-white">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#FFD100]">
            Our Work
          </p>

          <h2 className="mt-4 text-5xl font-black uppercase">
            Before & After Results
          </h2>

          <p className="mt-6 text-xl text-gray-400">
            Every vehicle tells a story. Here's what premium detailing looks like.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {gallery.map((image) => (
            <div
              key={image}
              className="overflow-hidden rounded-3xl border border-white/10"
            >
              <Image
                src={image}
                alt="Perry's Mobile Detailing"
                width={700}
                height={500}
                className="h-72 w-full object-cover transition duration-500 hover:scale-110"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}