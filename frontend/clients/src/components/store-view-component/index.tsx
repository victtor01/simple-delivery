import Link from "next/link";

type StatusText = "open" | "closed";

type StatusInfoType = {
  [key in StatusText]: {
    style: string;
    textPT: string;
  };
};

const StatusInfo: StatusInfoType = {
  open: { style: "bg-emerald-500", textPT: "Aberto" },
  closed: { style: "bg-rose-500", textPT: "Fechado" },
};

interface StoreViewPhotoProps {
  logo?: string;
  background?: string;
}

interface StoreViewInformationProps {
  title: string;
  description: string;
  link: string;
  status: StatusText;
}

interface StoreViewComponentProps {
  link: string;
  children: React.ReactNode;
}

const StoreViewPhoto = (props: StoreViewPhotoProps) => {
  const { logo, background } = props;
  return (
    <header
      className="p-3 h-[5rem] relative bg-gradient-45
      from-red-600 to-orange-400"
    >
      <span
        className="w-10 h-10 rounded-full absolute bottom-0 left-[0.5rem] 
        bg-orange-500 translate-y-[40%]"
      />
    </header>
  );
};

const StoreViewInformation = ({
  title,
  description,
  status,
  link
}: StoreViewInformationProps) => {
  return (
    <Link href={link} className="p-3">
      <div className="flex flex-col gap-3 mt-2">
        <div className="w-full justify-between flex items-center">
          <span className="font-semibold text-gray-700 flex-1">{title}</span>
          <span
            className={`font-semibold text-white p-1 px-2 text-sm rounded
            ${StatusInfo[status].style}`}
          >
            {StatusInfo[status].textPT}
          </span>
        </div>
        <div className="text-gray-400">{description || 'Sem descrição'}</div>
      </div>
    </Link>
  );
};

const StoreView = (props: StoreViewComponentProps) => {
  const { children, link } = props;
  return (
    <Link
      href={link}
      className="flex flex-col bg-white shadow-xl shadow-blue-50 min-h-[13rem] w-auto h-auto 
      rounded-md overflow-hidden hover:translate-y-[-0.3rem] transition-transform"
    >
      {children}
    </Link>
  );
};

const Components = {
  View: StoreView,
  Information: StoreViewInformation,
  Photo: StoreViewPhoto,
};

export default Components;
