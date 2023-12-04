"use client";
import { Fragment, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import ProfileDropdown from "@/components/ProfileDropdown";
import Navigation from "@/components/Navigation";
import Tippy from "@tippyjs/react";
import GroupCard from "@/components/GroupCard";
import MessageCard from "@/components/MessageCard";
import Chat from "@/components/Chat";
import Header from "@/components/Header";
import isAuth from "@/middleware/isAuth";

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
      <div>
        <Navigation />

        <div className="lg:pl-20">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button
                type="button"
                className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div
                className="h-6 w-px bg-gray-900/10 lg:hidden"
                aria-hidden="true"
            />

            <Header />
          </div>

          <main className="xl:pl-96 hidden lg:block">
            <Chat />
          </main>
        </div>

        <aside className="fixed bottom-0 lg:left-20 top-16 w-96 overflow-y-auto border-r border-gray-200 bg-white">
          <div className="flex flex-row justify-between items-center bg-slate-100 py-6 px-4 sm:px-6 lg:px-8">
            <div>
              <span className="font-semibold text-lg text-slate-900">Akış</span>
            </div>
            <div>
              <Tippy content="Merhaba">
                <button className="bg-blue-500 rounded-full text-white hover:bg-blue-600 h-8 w-8 flex flex-row justify-center items-center">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                  >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </button>
              </Tippy>
            </div>
          </div>
          <div className="flex flex-col gap-10 px-4 py-6 sm:px-6 lg:px-8">
            <GroupCard
                unreadMsgCount="2"
                groupName="Nerd Mining"
                latestSender="Metin"
                latestMsg="Notları atın la"
                latestMsgTime="12:00"
            />
            <MessageCard
                unreadMsgCount="1"
                senderFullname="Enes Öztekin"
                latestMsg="Kanka projeyi naptın?"
                latestMsgTime="15:35"
            />
            <GroupCard
                unreadMsgCount="0"
                groupName="Çay Tayfası"
                latestSender="Enes"
                latestMsg="Mangal yok mu bugün?"
                latestMsgTime="07:50"
            />
          </div>
        </aside>
      </div>
  );
}

export default isAuth(Home);
