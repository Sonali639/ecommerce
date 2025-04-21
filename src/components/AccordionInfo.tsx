"use client";

import { Disclosure } from "@/app/headlessui";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { FC } from "react";

interface AccordionItem {
  name: string;
  content: string;
  img?: string;
}

interface Props {
  panelClassName?: string;
  data: { description?: string; brand?: { name?: string; logo?: string } };
}

const AccordionInfo: FC<Props> = ({
  panelClassName = "p-4 flex items-center gap-4 pt-3 last:pb-0 text-slate-600 text-sm dark:text-slate-300 leading-6",
  data,
}) => {
  const accordionData: AccordionItem[] = [
    {
      name: "Description",
      content: data?.description || "No description available",
      img: "",
    },
    {
      name: "Brand",
      content: data?.brand?.name || "No brand information available",
      img: data?.brand?.logo || "",
    },
    {
      name: "Shop",
      content:data?.shop?.name,
      img: data?.shop?.logo,
    }
  
  ];

  return (
    <div className="w-full rounded-2xl space-y-2.5">
      {accordionData.map((item, index) => (
        <Disclosure key={index} defaultOpen={index < 2}>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex items-center justify-between w-full px-4 py-2 font-medium text-left bg-slate-100/80 hover:bg-slate-200/60 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-slate-500 focus-visible:ring-opacity-75">
                <span>{item.name}</span>
                {!open ? (
                  <PlusIcon className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                ) : (
                  <MinusIcon className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                )}
              </Disclosure.Button>
              <Disclosure.Panel className={panelClassName} as="div">
              {item.img && (
                  <div className="mt-2">
                    <img
                      src={item.img}
                      alt={`${item.name} image`}
                      className=" h-[58px] w-[58px] rounded-lg shadow-md"
                    />
                  </div>
                )}
                <div dangerouslySetInnerHTML={{ __html: item.content }} />
              
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </div>
  );
};

export default AccordionInfo;
