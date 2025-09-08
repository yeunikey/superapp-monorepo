"use client";

import { baseURL, host } from "@/shared/api/instance";

import NewAddModal from "@/features/news/ui/NewAddModal";
import NewEditModal from "@/features/news/ui/NewEditModal";
import View from "@/shared/ui/View";
import { fetchNews } from "@/features/news/model/newService";
import { useEffect } from "react";
import { useNewAddModal } from "@/features/news/model/useNewAddModal";
import { useNewEditModal } from "@/features/news/model/useNewEditModal";
import { useNews } from "@/entities/news/model/useNews";

export default function News() {

  const { news } = useNews();

  const { setOpen: setAddOpen } = useNewAddModal();
  const { setOpen: setEditOpen, setEditingNew } = useNewEditModal();

  useEffect(() => {
    fetchNews()
  }, [])

  return (
    <View>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.bubble.css" />

      <NewAddModal />
      <NewEditModal />

      <div className="text-3xl font-semibold text-dark">
        Управление новостями
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3">

        <div
          className="w-full aspect-[2] rounded-4xl flex justify-center items-center text-5xl text-gray border-gray cursor-pointer hover:bg-gray/15 transition-all duration-300"
          style={{
            border: "2px dashed"
          }}
          onClick={() => setAddOpen(true)}
        >
          +
        </div>

        {news
          .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
          .map((newItem, i) => (
            <div key={i} className="relative w-full aspect-[2] bg-background rounded-3xl flex items-end overflow-hidden cursor-pointer" onClick={() => {
              setEditOpen(true);
              setEditingNew(newItem);
            }}>
              {newItem.imageId && (
                <img
                  className="absolute w-full h-full object-cover"
                  src={`${baseURL}/images/${newItem.imageId}`}
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

