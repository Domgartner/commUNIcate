import Link from "next/link";
import Image from "next/image";

type PhotoBlockProps = {
  image: string;
  title: string;
  location: string;
  date: string;
  description: string;
};

const PhotoBlock = ({image, title, location, date, description}: PhotoBlockProps) => {
  return (
    <>
      <div>
        <Link href={""}>
          <div className=" flex flex-col group relative rounded-xl">
            <img
            src={image}
            alt={description}
            className="cursor-pointer rounded-xl"
            style={{ width: '100%', height: 'auto' }} 
          />
            <div className="opacity-0 group-hover:opacity-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl text-white font-bold">
              <h1 className="text-white">{description}</h1>
            </div>
            <div className="flex flex-row justify-around bg-beige py-5">
                <div className="flex-5 justify-items-center flex-col">
                    <div className="flex">
                        <h1 className="text-blue">{date}</h1>
                    </div>
                    <div className="flex">
                        <h1 className="text-xl font-bold">18</h1>
                    </div>
                </div>
                <div className="flex-2 justify-items-center flex-col">
                    <div className="flex">
                        <h1 className="text-xl font-bold">{title}</h1>
                    </div>
                    <div className="flex pt-1">
                        <h2 className="text-gray">{location}</h2>
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