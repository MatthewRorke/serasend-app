import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SidebarLinkGroup({ children, activecondition }) {
  const [open, setOpen] = useState(activecondition);
  const navigateTo = useNavigate();

  const handleClick = (path) => {
    setOpen(!open);
    navigateTo(path);
  };

  return (
    <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${activecondition && "bg-slate-900"}`}>
      {children(handleClick, open)}
    </li>
  );
}

export default SidebarLinkGroup;
