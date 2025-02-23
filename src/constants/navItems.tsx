import { MdOutlineDashboard } from "react-icons/md";
import { LuUsers } from "react-icons/lu";
import { TbTruckDelivery } from "react-icons/tb";
import { RiCoupon2Line } from "react-icons/ri";
import { TbSettings } from "react-icons/tb";
import { TbTag } from "react-icons/tb";
import { TbBriefcase } from "react-icons/tb";
import { MdOutlineShoppingCart } from "react-icons/md";

export const navItems = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: <MdOutlineDashboard />,
  },
  {
    title: "Services",
    url: "/admin/services",
    icon: <MdOutlineShoppingCart />,
  },
  {
    title: "Packages",
    url: "/admin/packages",
    icon: <TbTag />,
  },
  {
    title: "Bookings",
    url: "/admin/bookings",
    icon: <LuUsers />,
  },
  // {
  //   title: "Orders",
  //   url: "/admin/orders",
  //   icon: <TbTruckDelivery />,
  // },
  // {
  //   title: "Coupons",
  //   url: "/coupons",
  //   icon: <RiCoupon2Line />,
  // },
  {
    title: "Staff",
    url: "/admin/staff",
    icon: <TbBriefcase />,
  },
  // {
  //   title: "Settings",
  //   url: "/admin/settings",
  //   icon: <TbSettings />,
  // },
];

export const SidenavItems = [
  {
    title: "Dashboard",
    url: "/staff",
    icon: <MdOutlineDashboard />,
  },
  {
    title: "Bookings",
    url: "/staff/bookings",
    icon: <LuUsers />,
  },
  {
    title: "Availability",
    url: "/staff/availabel",
    icon: <TbBriefcase />,
  } 
];
