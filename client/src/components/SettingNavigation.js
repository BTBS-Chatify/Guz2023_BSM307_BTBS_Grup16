import {
  Bars3Icon,
  UserCircleIcon,
  BellAlertIcon,
  ClockIcon,
  LockClosedIcon,
  QuestionMarkCircleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
export default function SettingsNavigation() {
  return (
    <aside className="fixed bottom-0 max-md:hidden lg:left-20 top-16 w-80 overflow-y-auto  border-gray-200 bg-white">
      <div className="flex flex-row justify-between items-center bg-slate-100 px-4 sm:px-6 lg:px-8">
      </div>
      <Link href="/settings" className="flex flex-col">
        <div class="md:flex">
          <ul class="menu w-full">
            <div className="shadow-sm hover:shadow-md hover:bg-gray-200 flex">
                <span className="p-2">
                  <UserCircleIcon class="p-2 w-12 h-12 text-blue-400" />
                </span>
                <span className="flex flex-col p-2">
                  <span className="font-semibold">Hesap</span>
                  <span className="text-gray-400 text-xs">Profil resmi, e-posta, şifre</span>
                </span>
            </div>
          </ul>
        </div>
      </Link>
      <Link href="/logout" className="flex flex-col">
      <div class="sm:flex item">
          <ul class="menu w-full">
            <div className="shadow-sm hover:shadow-md hover:bg-gray-200 flex items-center">
                <span className="pl-2">
                  <ArrowRightOnRectangleIcon class="p-2 h-12 w-12 text-red-500" />
                </span>
                <span className="font-bold text-red-500 p-4">Çıkış Yap</span>
            </div>
          </ul>
        </div>
      </Link>
    </aside>
  )
}
