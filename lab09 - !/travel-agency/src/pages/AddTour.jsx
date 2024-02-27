import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Textarea,
  Button,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import { useCountries } from "use-react-countries";
import Modal from "../components/Modal";

import { addTour } from "../utils/dbProvider";

export default function AddTour() {
  const navigate = useNavigate();
  const { countries } = useCountries();

  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [price, setPrice] = useState("");
  const [seats, setSeats] = useState("");
  const [description, setDescription] = useState("");

  const handleAddTour = async (e) => {
    e.preventDefault();
    const newTour = {
      name,
      country,
      dateStart,
      dateEnd,
      price,
      seats,
      description,
    };

    await addTour(newTour);
    navigate("..");
  };

  return (
    <Modal>
      <Card className="w-full">
        <CardHeader
          color="gray"
          floated={false}
          shadow={false}
          className="m-0 grid place-items-center px-4 py-8 text-center"
        >
          <Typography variant="h5" color="white">
            Add Tour
          </Typography>
        </CardHeader>
        <CardBody>
          <form className="mt-12 flex flex-col gap-4">
            <Input
              onChange={(e) => {
                setName(e.target.value);
              }}
              id="name"
              label="Tour name"
              type="text"
            />
            <div>
              <Select
                onChange={(v) => {
                  setCountry(v);
                }}
                size="lg"
                label="Select destination country"
                selected={(element) =>
                  element &&
                  React.cloneElement(element, {
                    disabled: true,
                    className:
                      "flex items-center opacity-100 px-0 gap-2 pointer-events-none",
                  })
                }
              >
                {countries
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map(({ name, flags }) => (
                    <Option
                      key={name}
                      value={name}
                      className="flex items-center gap-2"
                    >
                      <img
                        src={flags.svg}
                        alt={name}
                        className="h-5 w-5 rounded-full object-cover"
                      />
                      {name}
                    </Option>
                  ))}
              </Select>
            </div>
            <div className="my-4 flex items-center gap-4">
              <Input
                onChange={(e) => {
                  setDateStart(e.target.value);
                }}
                id="dateStart"
                label="Date start"
                type="date"
              />
              <Input
                onChange={(e) => {
                  setDateEnd(e.target.value);
                }}
                id="dateEnd"
                label="Date end"
                type="date"
              />
            </div>
            <div className="my-4 flex items-center gap-4">
              <Input
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                id="price"
                label="Price in USD"
                type="number"
              />
              <Input
                onChange={(e) => {
                  setSeats(e.target.value);
                }}
                id="seats"
                label="Number of seats"
                type="number"
              />
            </div>
            <Textarea
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              id="description"
              label="Trip description"
            />
            <Button onClick={handleAddTour} size="lg">
              Complete
            </Button>
          </form>
        </CardBody>
      </Card>
    </Modal>
  );
}
