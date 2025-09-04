"use client";

import View from "@/shared/ui/View";
import { useAuth } from "@/entities/data/model/useAuth";
import { useState } from "react";
import Loader from "@/shared/ui/Loader";

type Complaint = {
  id: number;
  type: "complaint" | "suggestion";
  title: string;
  text: string;
};

type Category = {
  id: number;
  name: string;
  description: string;
};

const mockComplaints: Complaint[] = [
  { id: 1, type: "complaint", title: "Не работает кондиционер", text: "В аудитории слишком жарко" },
  { id: 2, type: "complaint", title: "Не работает кондиционер", text: "В аудитории слишком жарко" },
  { id: 3, type: "complaint", title: "Не работает кондиционер", text: "В аудитории слишком жарко" },
  { id: 7, type: "suggestion", title: "Добавить курсы", text: "Было бы круто ввести курс по React Native" },
];

const mockCategories: Category[] = [
  { id: 1, name: "Инфраструктура", description: "Жалобы, связанные с помещениями, оборудованием и т.п." },
  { id: 2, name: "Учебный процесс", description: "Проблемы с расписанием, преподавателями, дисциплинами." },
  { id: 3, name: "Администрация", description: "Вопросы к администрации и обслуживающему персоналу." },
];

export default function Home() {
  const { token } = useAuth();
  const [activeTab, setActiveTab] = useState<"complaint" | "suggestion">("complaint");

  const filtered = mockComplaints.filter((c) => c.type === activeTab);

  return (
    <div className="py-6 space-y-6">
      <div>
        <div className="text-2xl font-semibold mb-3 mx-6">Мои обращения</div>

        <div className="px-6 py-4 rounded-4xl bg-white">
          <div className="test">
            <div className="font-semibold">Нарушение академ. честности</div>
            <div className="text-sm text-secondary mt-1">Мой однокурсник Кунтуганов Рауан SE-2401 списывал на уроке Дискретная математика...</div>

            <div className="mt-4 flex gap-4 items-center">
              <div className="text-sm text-white py-1 px-3 bg-green-600 rounded-full flex gap-3">
                Обработано
              </div>

              <div className="text-sm text-secondary">
                Академические вопросы
              </div>
            </div>
          </div>

          <div className="flex justify-center my-4">
            <div className="w-[95%] bg-background h-0.5" />
          </div>

          <div className="test">
            <div className="font-semibold">Не работает кондиционер</div>
            <div className="text-sm text-secondary mt-1">В аудитории слишком жарко</div>

            <div className="mt-4 flex gap-4 items-center">
              <div className="text-sm py-1 px-3 bg-background rounded-full flex gap-3">
                <Loader childClassName="w-4 h-4 border-3" />
                <div>
                  Рассматривается
                </div>
              </div>

              <div className="text-sm text-secondary">
                Инфраструктура
              </div>
            </div>
          </div>

          <div className="flex justify-center my-4">
            <div className="w-[95%] bg-background h-0.5" />
          </div>

          <div className="test">
            <div className="font-semibold">Неприличное поведение</div>
            <div className="text-sm text-secondary mt-1">Мой однокурсник Кунтуганов Рауан SE-2401 пишет гадости по отношению ко мне...</div>

            <div className="mt-4 flex gap-4 items-center">
              <div className="text-sm py-1 px-3 bg-background rounded-full">
                Не рассмотрено
              </div>

              <div className="text-sm text-secondary">
                Личные проблемы
              </div>
            </div>
          </div>
        </div>


      </div>

      <div>
        <div className="flex gap-3 mb-4 mx-6">
          <button
            onClick={() => setActiveTab("complaint")}
            className={`px-4 py-2 rounded-4xl text font-medium ${activeTab === "complaint" ? "bg-primary text-white" : "bg-white text-dark"
              }`}
          >
            Жалобы
          </button>
          <button
            onClick={() => setActiveTab("suggestion")}
            className={`px-4 py-2 rounded-4xl text font-medium ${activeTab === "suggestion" ? "bg-primary text-white" : "bg-white text-dark"
              }`}
          >
            Предложения
          </button>
        </div>

        <div className="grid gap-3">
          <div
            className="p-4 rounded-4xl bg-white px-6 py-4"
          >
            <div className="font-semibold text-lg">Академические вопросы</div>
            <div className="text-sm text-gray-600 mt-1">Проблемы с преподавателями, задержки или ошибки в оценках, вопросы по учебным материалам или расписанию.</div>
          </div>

          <div
            className="p-4 rounded-4xl bg-white px-6 py-4"
          >
            <div className="font-semibold text-lg">Инфраструктура</div>
            <div className="text-sm text-gray-600 mt-1">
              Жалобы на состояние корпусов, аудитории и общежития, проблемы с оборудованием, интернетом или благоустройством территории.
            </div>
          </div>

          <div
            className="p-4 rounded-4xl bg-white px-6 py-4"
          >
            <div className="font-semibold text-lg">Академические вопросы</div>
            <div className="text-sm text-gray-600 mt-1">Проблемы с преподавателями, задержки или ошибки в оценках, вопросы по учебным материалам или расписанию.</div>
          </div>
        </div>
      </div>
    </div >
  );
}
