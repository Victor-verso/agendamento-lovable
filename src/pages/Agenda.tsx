
import Layout from "@/components/Layout";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

const Agenda = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Layout>
      <div className="space-y-4">
        <div className="flex justify-center p-4 bg-white rounded-lg shadow">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </div>
      </div>
    </Layout>
  );
};

export default Agenda;
