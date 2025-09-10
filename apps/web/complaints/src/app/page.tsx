"use client";

import CategoriesList from "@/widgets/home/CategoriesList";
import MyComplaints from "@/widgets/home/MyComplaints";

export default function Home() {
  return (
    <div className="py-6 space-y-6 pb-32">

      <MyComplaints />
      <CategoriesList />

    </div >
  );
}
