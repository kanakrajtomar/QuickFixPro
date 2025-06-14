"use client";
import React, { useState, useEffect } from "react";
import { MdSettings } from "react-icons/md";
import CourseForm from "../components/CourseForm"; // Adjust path if needed
import MobileNavbar from "../components/MobileNavbar"; // Adjust path if needed
import Modal from "../components/modal";

const Traning = () => {
  const [openForm, setOpenForm] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>(null); // Track expanded course card
  const [courseCategory, setCourseCategory] = useState<any[]>([]);
  const [videoInfo, setVideoInfo] = useState<any[]>([
    { id: "#" },
    { id: "#" },
    { id: "#" },
    { id: "#" },
  ]); // Example video IDs

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          "https://ad-api.sampurnakart.in/api/courses"
        );
        if (!response.ok) throw new Error("Failed to fetch courses");
        const data = await response.json();
        setCourseCategory(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleCourseClick = (course: any) => {
    setSelectedCourse(course);
    setOpenForm(true);
  };

  const toggleExpanded = (id: string) => {
    setExpandedCourseId(expandedCourseId === id ? null : id); // Toggle expansion state
  };

  const closeModal = () => {
    setOpenForm(false);
    setSelectedCourse(null);
  };

  return (
    <div className="h-full w-full pt-36 max-sm:pt-24 relative mt-10">
      <h1 className="text-5xl max-sm:text-xl font-semibold text-black w-full text-center">
        Repair Training Courses
      </h1>
      <div className="w-full p-10 h-full grid grid-cols-3 max-sm:grid-cols-1 max-md:grid-cols-2 gap-8 justify-items-center">
        {courseCategory.map((item, index) => (
          <CourseCard
            key={index}
            details={item}
            isExpanded={expandedCourseId === item.id}
            onExpand={() => toggleExpanded(item.id)}
            onClick={() => handleCourseClick(item)}
          />
        ))}
      </div>
      <h1 className="text-5xl max-sm:text-xl font-semibold text-black w-full text-center my-20 max-sm:my-10">
        Our Special Training Videos
      </h1>
      <div className="w-full p-10 rounded-lg h-full grid grid-cols-2 max-sm:grid-cols-1 gap-14">
        {videoInfo.map((item, index) => (
          <div
            key={index}
            className="w-full cursor-pointer select-none transition-all hover:shadow-2xl hover:shadow-[#ffd7b0] flex flex-col justify-center align-middle h-72 rounded-lg shadow-lg shadow-[#ffdbb7] border border-[#FF9933]"
          >
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${item.id}`}
              title={`YouTube video ${index + 1}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ))}
      </div>

      {selectedCourse && (
        <Modal isOpen={openForm} onClose={closeModal} title="Book Your Course">
          <div className="w-full h-[calc(100vh-2rem)] md:h-[calc(100vh-4rem)] flex flex-col">
            <div className="flex-1 flex flex-col overflow-auto">
              <div className="w-full p-4 flex flex-col md:hidden">
                <h2 className="text-2xl font-semibold mb-2">Course Name</h2>
                <p className="text-lg font-semibold mb-2 text-center">
                  {selectedCourse?.name || ""}
                </p>
                <h2 className="text-lg font-semibold mb-2 text-center">
                  Course Description
                </h2>
                <div className="flex-1 overflow-auto mb-4">
                  <div
                    className="text-sm text-gray-600"
                    dangerouslySetInnerHTML={{
                      __html: selectedCourse?.description || "",
                    }}
                  />
                </div>
                <h2 className="text-lg font-semibold mb-2 text-center">
                  Fill The Form Now
                </h2>
              </div>
              <div className="hidden md:flex md:w-full p-4">
                <div className="w-full md:w-1/2 p-4 flex flex-col">
                  <h2 className="text-lg font-semibold mb-2 text-center">
                    Course Name
                  </h2>
                  <p className="text-lg mb-2 text-center">
                    {selectedCourse?.name || ""}
                  </p>
                  <h2 className="text-lg font-semibold mb-2 text-center">
                    Course Description
                  </h2>
                  <div className="flex-1 overflow-auto">
                    <div
                      className="text-sm text-gray-600"
                      dangerouslySetInnerHTML={{
                        __html: selectedCourse?.description || "",
                      }}
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2 p-4 flex flex-col">
                  <p className="text-lg font-semibold mb-2 text-center">
                    Enrollment Form
                  </p>
                  <CourseForm
                    courseID={selectedCourse}
                    setOpenForm={setOpenForm}
                  />
                </div>
              </div>
            </div>
            <div className="md:hidden w-full p-4">
              {openForm && (
                <CourseForm
                  courseID={selectedCourse}
                  setOpenForm={setOpenForm}
                />
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

const CourseCard = ({ details, isExpanded, onExpand, onClick }: any) => {
  return (
    <div
      className="h-64 w-80 max-sm:w-full rounded-lg hover:outline-double transition-all hover:outline-blue-600 border-gray-300 shadow-lg flex relative select-none cursor-pointer"
      onClick={onClick}
    >
      <div className="p-8 flex flex-col overflow-hidden">
        <div>
          <MdSettings className="bg-[#27187E] p-3 max-sm:p-1 rounded-lg size-14 max-sm:w-14 text-white" />
          <p className="font-bold text-lg text-black pt-3 truncate max-w-xs text-center">
            {details.name}
          </p>
          <span className="border border-[#E74040] my-2 max-sm:my-0 w-20 self-center" />
          <div className="text-sm text-[#737373] pt-5 max-h-16">
            <div
              className={`line-clamp-3 ${isExpanded ? "line-clamp-none" : ""}`}
              dangerouslySetInnerHTML={{ __html: details.description }}
            />
          </div>
        </div>
      </div>
      <MobileNavbar />
    </div>
  );
};

export default Traning;
