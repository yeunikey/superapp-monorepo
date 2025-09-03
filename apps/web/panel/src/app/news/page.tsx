"use client";

import View from "@/shared/ui/View";
import { useEffect } from "react";
import { fetchNews } from "@/features/news/model/newService";
import { useNews } from "@/entities/news/model/useNews";
import { useNewAddModal } from "@/features/news/model/useNewAddModal";
import NewAddModal from "@/features/news/ui/NewAddModal";
import { host } from "@/shared/api/instance";

export default function News() {

  const { news } = useNews();
  const { setOpen } = useNewAddModal();

  useEffect(() => {
    fetchNews()
  }, [])

  return (
    <View>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.bubble.css" />

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
          <div key={i} className="relative w-full aspect-[2] bg-background rounded-3xl flex items-end overflow-hidden">
            {newItem.imageId && (
              <img
                className="absolute w-full h-full object-cover"
                src={`${host}:4003/images/${newItem.imageId}`}
                alt="preview"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

            <div className="text-white px-4 py-4 font-semibold text-lg line-clamp-2 z-10">
              {newItem.title || "Превью"}
            </div>
          </div>
        ))}

      </div>

    </View>
  );
}

