"use client";

import View from "@/shared/ui/View";
import { useEffect } from "react";
import { fetchNews } from "@/features/news/model/newService";
import { useNews } from "@/entities/news/model/useNews";
import { useNewAddModal } from "@/features/news/model/useNewAddModal";
import NewAddModal from "@/features/news/ui/NewAddModal";

export default function News() {

  const { news } = useNews();
  const { setOpen } = useNewAddModal();

  useEffect(() => {
    fetchNews()
  }, [])

  return (
    <View>

      <NewAddModal />

      <div className="text-3xl font-semibold text-dark">
        Управление новостями
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3">

        <div
          className="w-full aspect-[2] rounded-4xl flex justify-center items-center text-5xl text-gray border-gray cursor-pointer hover:bg-gray/15 transition-all duration-300"
          style={{
            border: "2px dashed"
          }}
          onClick={() => setOpen(true)}
        >
          +
        </div>

        {news.map((newItem, i) => (
          <div key={i} className="w-full aspect-[2] bg-red-50 rounded-4xl flex items-end">
            <div className="px-4 py-4 font-semibold text-xl line-clamp-2">
              {newItem.title}
            </div>
          </div>
        ))}

      </div>

    </View>
  );
}

