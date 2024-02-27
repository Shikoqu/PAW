import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Carousel,
} from "@material-tailwind/react";

const accordionData = [
  {
    title: "Header 1",
    body: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni laudantium possimus cupiditate accusamus amet, laborum doloribus optio expedita doloremque asperiores, quaerat soluta est, nobis hic voluptatem harum porro exercitationem laboriosam odio iure repudiandae? Laborum accusantium expedita qui maiores deserunt! Ea ipsum dolore laborum cum tempore in, blanditiis vero! Cumque, sit. Aut nisi ut adipisci reprehenderit natus sed earum dolores ab dolore a, nesciunt maxime ratione asperiores inventore necessitatibus! Totam consequuntur suscipit impedit numquam. Incidunt magni sed maiores quibusdam aperiam? Ipsa iusto consectetur architecto! Repellendus earum quos expedita illum tempora et sit est, aliquam nemo voluptate eos necessitatibus molestiae! Sequi, cumque?",
  },
  {
    title: "Header 2",
    body: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non sunt deleniti magni provident debitis aliquam sint, animi tempora delectus nisi quos ex consequatur perspiciatis quas eaque dignissimos quia, dolore nulla voluptates. Reiciendis accusantium, illum perspiciatis sunt eveniet nemo odit porro id veritatis quos, sint deserunt ratione excepturi inventore? Voluptatibus, eligendi.",
  },
  {
    title: "Header 3",
    body: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus obcaecati eveniet porro vitae iure ipsam nobis facere sint inventore exercitationem?",
  },
];

export function CarouselTransition() {
  return (
    <Carousel transition={{ duration: 2 }} className="rounded-xl">
      <img
        src="https://picsum.photos/750/405?random=1"
        alt="image 1"
        className="h-full w-full object-cover"
      />
      <img
        src="https://picsum.photos/750/405?random=2"
        alt="image 2"
        className="h-full w-full object-cover"
      />
      <img
        src="https://picsum.photos/750/405?random=3"
        alt="image 3"
        className="h-full w-full object-cover"
      />
    </Carousel>
  );
}

const CUSTOM_ANIMATION = {
  mount: { scale: 1 },
  unmount: { scale: 0.9 },
};

export function AccordionCustomAnimation() {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? -1 : value);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {accordionData.map(({ title, body }, key) => (
        <Accordion
          open={open === key}
          animate={CUSTOM_ANIMATION}
          key={key}
          className="my-2 w-full md:w-1/2"
        >
          <AccordionHeader onClick={() => handleOpen(key)}>
            {title}
          </AccordionHeader>
          <AccordionBody className="p-2">{body}</AccordionBody>
        </Accordion>
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <CarouselTransition />
      <AccordionCustomAnimation />
    </>
  );
}
