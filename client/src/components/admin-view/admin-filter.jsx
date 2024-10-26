import { Search } from "lucide-react";
import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { categoryOptionsMap, sortOptions } from "@/config";

const AdminFilters = ({
  handleFilter,
  filters,
  handleSort,
  sort,
  handleSearch,
}) => {
  return (
    <div className="flex flex-col flex-1 gap-2 bg-background rounded-md shadow-md sm:p-6 p-4">
      <div className="flex gap-4 items-center justify-between">
        <h1 className="sm:text-xl font-semibold text-nowrap">
          Filter Products
        </h1>
        <div className="relative flex">
          <Search
            size={20}
            className="absolute sm:translate-y-[50%] translate-y-[30%] left-2"
          />
          <Input
            className="pl-8 sm:!h-10 !h-8 focus-visible:ring-transparent focus-visible:ring-offset-transparent !border-1 focus:border-violet-500"
            onChange={handleSearch}
            placeholder="Search"
          />
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-nowrap">
          <Label className="text-nowrap text-violet">Category : </Label>
          {Object.entries(categoryOptionsMap).map(([key, keyItem], index) => (
            <p
              key={index}
              className="flex items-center gap-1 text-sm text-muted-foreground"
            >
              <Checkbox
                onCheckedChange={() => handleFilter(keyItem)}
                checked={filters.includes(keyItem)}
                className="scale-75"
              />
              <span>{keyItem}</span>
            </p>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Label className="text-nowrap text-violet">Sort by : </Label>
        <Select onValueChange={handleSort} value={sort}>
          <SelectTrigger className="w-40 sm:py-2 py-1">
            <SelectValue placeholder="Price low to high">
              {sortOptions.find((item) => item.id === sort)?.label}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default AdminFilters;
