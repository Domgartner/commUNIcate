import Link from "next/link";
import Image from "next/image";

type PhotoBlockProps = {
  image: string;
  link: string;
  height: number;
  heading: string;
};

const PhotoBlock = ({ image, link, height, heading }: PhotoBlockProps) => {
  return (
    <>
      <div>
        <Link href={link}>
          <div className=" flex flex-col group relative rounded-xl">
            <Image
              className="flex cursor-pointer"
              src={image}
              layout="responsive"
              width={100}
              height={height}
              objectFit="cover"
              objectPosition="50%,50%"
              alt="Photo"
            />
            <div className="opacity-0 group-hover:opacity-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl text-white font-bold">
              <h1>RSVP</h1>
            </div>
            <div className="flex flex-row justify-around bg-beige py-5">
                <div className="flex-5 justify-items-center flex-col">
                    <div className="flex">
                        <h1 className="text-blue">SEP</h1>
                    </div>
                    <div className="flex">
                        <h1 className="text-xl font-bold">18</h1>
                    </div>
                </div>
                <div className="flex-2 justify-items-center flex-col">
                    <div className="flex">
                        <h1 className="text-xl font-bold">Loungers Hide and Seek</h1>
                    </div>
                    <div className="flex pt-1">
                        <h2 className="text-gray">engg lounge</h2>
                    </div>
                </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default PhotoBlock;