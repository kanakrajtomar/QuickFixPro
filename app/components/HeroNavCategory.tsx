"use client";

import { useEffect } from "react";
import { fetchCategories } from "@/store/slices/category/categories";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";

export interface Category {
  _id: string;
  name: string;
  imageURL: string;
  isVisible: boolean;
}

export default function HeroNavCategory() {
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );
  // const [categories, setCategories] = useState<Category[]>([]);

  // useEffect(function() {
  //     async function getCategories() {
  //         const categories = await fetchCategories ();
  //         setCategories(categories);
  //     }

  //     getCategories();
  // }, [])

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <nav className="px-4   lg:py-1 lg:px-8 border-t-2 border-t-[#758BFD] shadow-heroNavShadow w-full">
   
    </nav>
  );
}
