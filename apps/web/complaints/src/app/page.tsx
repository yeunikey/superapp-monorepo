"use client";

import { useAuth } from "@/entities/data/model/useAuth";
import { useEffect, useState } from "react";
import Loader from "@/shared/ui/Loader";
import CategoriesList from "@/widgets/home/CategoriesList";

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

          {/* <div className="flex justify-center my-4">
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
          </div> */}
        </div>

        <div className="flex justify-center py-4 items-center gap-3">
          <div className="text-secondary">
            Посмотреть все
          </div>

          <svg xmlns="http://www.w3.org/2000/svg" className="fill-secondary" height="28px" viewBox="0 -960 960 960"><path d="M655-200 513-342l56-56 85 85 170-170 56 57-225 226Zm0-320L513-662l56-56 85 85 170-170 56 57-225 226ZM80-280v-80h360v80H80Zm0-320v-80h360v80H80Z" /></svg></div>

      </div>

      <div>
        <div className="text-2xl font-semibold mb-3 mx-6">Выберите категорию</div>


        <CategoriesList />
      </div>
    </div >
  );
}
