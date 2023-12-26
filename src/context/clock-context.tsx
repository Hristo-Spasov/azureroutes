import { useState, useEffect, createContext, ReactNode } from "react";
import dayjs, { Dayjs } from "dayjs";

interface ClockContextProps {
  date: Dayjs | null;
  setDate: React.Dispatch<React.SetStateAction<Dayjs | null>>;
}

interface Props {
  children: ReactNode;
}

export const ClockContext = createContext<ClockContextProps>({
  date: null,
  setDate: () => {},
});

export const ClockProvider = ({ children }: Props) => {
  const [date, setDate] = useState<Dayjs | null>(dayjs());

  // Local date & clock
  useEffect(() => {
    const initialDate = dayjs();
    setDate(initialDate);

    const intervalID = setInterval(() => {
      setDate((prevDate) => {
        return prevDate ? prevDate.add(1, "second") : null;
      });
    }, 1000);

    return () => clearInterval(intervalID);
  }, []);

  const value = {
    date,
    setDate,
  };

  return (
    <ClockContext.Provider value={value}>{children}</ClockContext.Provider>
  );
};
