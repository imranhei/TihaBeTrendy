import React from 'react'

const QuickViewCard = ({
    header,
    text,
    icon,
    value,
    onClick = () => {},
}) => {
  return (
    <div className="shadow-md hover:shadow-xl hover:shadow-violet-200 bg-background w-72 h-40 rounded-lg p-6 flex items-center justify-between hover:ring-1 hover:ring-violet-500 cursor-pointer trasition-all duration-300 bg-gradient-to-tr from-fuchsia-50 to-cyan-50">
        <div className="bg-violet-100 rounded-lg p-3">
          {icon}
        </div>
        <div className="flex flex-col text-right font-semibold text-muted-foreground">
          <span className="text-xl">{header}</span>
          <span className="text-sm text-slate-400">{text}</span>
          <span className="text-3xl">{value || "--"}</span>
        </div>
      </div>
  )
}

export default QuickViewCard
