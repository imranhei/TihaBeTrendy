import React from 'react'

const QuickViewCard = ({
    header,
    text,
    icon,
    value,
    onClick = () => {},
}) => {
  return (
    <div className="shadow-md hover:shadow-xl hover:shadow-violet-200 bg-background sm:w-72 w-[calc(100vw/2-20px)] sm:h-40 h-28 rounded-lg sm:p-6 p-2 flex items-center justify-between hover:ring-1 hover:ring-violet-500 cursor-pointer trasition-all duration-300 bg-gradient-to-tr from-fuchsia-50 to-cyan-50">
        <div className="bg-violet-100 rounded-lg sm:p-3 p-2">
          {icon}
        </div>
        <div className="flex flex-col text-right font-semibold text-muted-foreground">
          <span className="sm:text-xl text-[3.5vw]">{header}</span>
          <span className="sm:text-sm text-xs text-slate-400">{text}</span>
          <span className="sm:text-3xl text-2xl">{value || "--"}</span>
        </div>
      </div>
  )
}

export default QuickViewCard
