import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/accordion'

const Faq = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="font-semibold text-5xl text-[#000000] mb-16">
        Frequently Asked Questions
      </h1>
      <Accordion
        collapsible
        defaultValue="item-1"
        type="single"
        className={'space-y-5 w-full'}
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>Is it unstyled?</AccordionTrigger>
          <AccordionContent>
            Yes. It{"'"}s unstyled by default, giving you freedom over the look
            and feel.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>Can it be animated?</AccordionTrigger>
          <AccordionContent>
            Yes! You can animate the Accordion with CSS or JavaScript.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default Faq
