import { Table, TableColumnsType, Tag } from "antd";
import { Advocate } from "../page";

const Specialties = [
  "Bipolar",
  "LGBTQ",
  "Medication/Prescribing",
  "Suicide History/Attempts",
  "General Mental Health (anxiety, depression, stress, grief, life transitions)",
  "Men's issues",
  "Relationship Issues (family, friends, couple, etc)",
  "Trauma & PTSD",
  "Personality disorders",
  "Personal growth",
  "Substance use/abuse",
  "Pediatrics",
  "Women's issues (post-partum, infertility, family planning)",
  "Chronic pain",
  "Weight loss & nutrition",
  "Eating disorders",
  "Diabetic Diet and nutrition",
  "Coaching (leadership, career, academic and wellness)",
  "Life coaching",
  "Obsessive-compulsive disorders",
  "Neuropsychological evaluations & testing (ADHD testing)",
  "Attention and Hyperactivity (ADHD)",
  "Sleep issues",
  "Schizophrenia and psychotic disorders",
  "Learning disorders",
  "Domestic abuse",
];

interface Table {
  loading: boolean;
  advocates: Advocate[] | [];
}

export const AdvocateTable = ({ advocates, loading }: Table) => {
  const columns: TableColumnsType<Advocate> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      hidden: true,
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
      width: "30%",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      sorter: (a, b) => a.lastName.localeCompare(b.lastName),
      width: "30%",
    },
    {
      title: "City",
      dataIndex: "city",
      sorter: (a, b) => a.city.localeCompare(b.city),
      width: "40%",
    },
    {
      title: "Degree",
      dataIndex: "degree",
      sorter: (a, b) => a.degree.localeCompare(b.degree),
      width: "40%",
    },
    {
      title: "Specialties",
      dataIndex: "specialties",
      filters: Specialties.sort((a, b) =>
        a.toLowerCase().localeCompare(b.toLowerCase())
      ).map((specialty) => ({
        text: specialty,
        value: specialty,
      })),
      filterMode: "menu",
      filterSearch: true,
      onFilter: (value, record) =>
        record.specialties?.some((s) => s.includes(value as string)),
      width: "30%",
      render: (_, { specialties }) => (
        <>
          {specialties.map((specialty, sIndex) => {
            return (
              <Tag color={"default"} key={sIndex}>
                {specialty}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Years of Experience",
      dataIndex: "yearsOfExperience",
      sorter: (a, b) => a.yearsOfExperience - b.yearsOfExperience,
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      onFilter: (value, record) => record.degree.includes(value as string),
      filterSearch: true,
      width: "40%",
    },
  ];

  return (
    <Table<Advocate>
      columns={columns}
      dataSource={advocates}
      loading={loading}
      rowKey="id"
    />
  );
};
