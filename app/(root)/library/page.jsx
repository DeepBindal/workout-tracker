import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { exerciseList } from "@/lib/constants";

const Page = () => {
  return (
    <>
    <div className="flex flex-col items-center px-4 py-6 lg:px-8">
      <h1 className="text-3xl md:text-4xl font-bold  mb-4">Exercise Library</h1>
      <p className="text-lg md:text-xl text-center max-w-xl mb-6">
        Discover the best exercises curated for each muscle group.
      </p>
      <div className="w-full max-w-2xl">
        {exerciseList.map((item, index) => (
          <Accordion key={index} type="single" collapsible>
            <AccordionItem value={`item-${index}`}>
              <AccordionTrigger className="text-lg font-semibold">
                {item.title}
              </AccordionTrigger>
              <AccordionContent className="space-y-2 mt-2">
                {item.exercise.map((ex, idx) => (
                  <p key={idx} className="text-base md:text-lg">
                    {ex}
                  </p>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </div>
    </>
  );
};

export default Page;
