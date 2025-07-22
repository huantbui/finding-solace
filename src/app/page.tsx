"use client";

import { useEffect, useState } from "react";
import { AdvocateTable } from "./components/advocate-table";
import { Input } from "antd";
import { SearchProps } from "antd/es/input/Search";
import { useQuery } from "@tanstack/react-query";

const { Search } = Input;

export interface Advocate {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: number;
}

export default function Home() {
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[] | []>(
    []
  );
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isError, isLoading } = useQuery({
    queryKey: ["advocates"],
    queryFn: async () => {
      const response = await fetch("/api/advocates");
      const jsonResponse = await response.json();
      return jsonResponse.data;
    },
  });

  useEffect(() => {
    if (data) {
      setFilteredAdvocates(data);
    }
  }, [data]);

  useEffect(() => {
    const filteredAdvocates = data?.filter((advocate: Advocate) => {
      return (
        advocate.firstName.includes(searchTerm) ||
        advocate.lastName.includes(searchTerm) ||
        advocate.city.includes(searchTerm) ||
        advocate.degree.includes(searchTerm) ||
        advocate.specialties.some((specialty: string) =>
          specialty.includes(searchTerm)
        ) ||
        `${advocate.yearsOfExperience}`.includes(searchTerm) ||
        `${advocate.phoneNumber}`.includes(searchTerm)
      );
    });
    setFilteredAdvocates(filteredAdvocates);
  }, [searchTerm]);

  const handleReset = () => {
    setSearchTerm("");
    setFilteredAdvocates(data);
  };

  const onSearch: SearchProps["onSearch"] = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <div>
        <Search
          placeholder="Search advocates (eg: Smith or Houston)"
          allowClear
          onSearch={onSearch}
          onClear={handleReset}
          style={{ width: "40%" }}
        />
      </div>
      {isError ? (
        <div style={{ color: "red", marginTop: "16px" }}>
          Error fetching advocates data. Please try again later.
        </div>
      ) : (
        <AdvocateTable advocates={filteredAdvocates} loading={isLoading} />
      )}
    </main>
  );
}
