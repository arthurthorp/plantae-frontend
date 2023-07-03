'use client'

import TabsItem from './Item'

interface TabsListProps {
  tabs: {
    label: string
    path: string
    selected: boolean
  }[]
  baseURL: string
}

export default function TabsList(props: TabsListProps) {
  return (
    <div className="flex flex-nowrap items-center justify-start gap-2 overflow-auto">
      {props.tabs.map((tab) => (
        <TabsItem
          key={tab.label}
          label={tab.label}
          path={`${props.baseURL}?tab=${tab.path}`}
          selected={tab.selected}
        />
      ))}
    </div>
  )
}
