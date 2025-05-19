import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import React from "react";

const AccordionReusable = ({ title, discreption }: any) => {
  return (
    <Accordion
      type="single"
      className="bg-[var(--main-green)]  rounded-2xl border-2 px-4"
      collapsible
    >
      <AccordionItem
        value="item-1"
        className="transition-all duration-300 rounded-xl   border border-transparent "
      >
        <AccordionTrigger className="py-4 px-2 text-md  lg:text-2xl hover:no-underline flex items-center justify-between w-full [&>svg]:w-5 [&>svg]:h-5">
          {title}
        </AccordionTrigger>
        <AccordionContent className="max-h-[200px] overflow-auto pb-4 text-lg">
          {discreption}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AccordionReusable;
