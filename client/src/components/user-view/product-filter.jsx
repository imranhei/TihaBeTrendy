import React from "react";
import { categoryOptionsMap, sortOptions } from "@/config";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";

const ProductFilter = ({ handleFilter, filters, handleSort, sort }) => {
  return (
    <div className="bg-background rounded-lg shadow md:w-60 w-full">
      <div className="p-4 border-b">
        <h2 className="text-lg font-bold">Filters</h2>
      </div>
      <div className="flex md:block">
        <div>
          <h3 className="pt-4 pl-4 text-md font-semibold">Category</h3>
          <div className="p-4 space-y-4">
            {Object.entries(categoryOptionsMap).map(([key, keyItem], index) => (
              <Label
                key={index}
                className="flex items-center gap-2 font-medium"
              >
                <Checkbox
                  onCheckedChange={() => handleFilter(keyItem)}
                  checked={
                    filters && filters.length > 0 && filters.includes(keyItem)
                  }
                />
                <p>{keyItem}</p>
              </Label>
            ))}
          </div>
        </div>
        <div className="p-4 space-y-4">
          <h3 className=" text-md font-semibold">Sort by</h3>
          {sortOptions.map((value, index) => (
            <Label key={index} className="flex items-center gap-2 font-medium">
              <Checkbox
                onCheckedChange={() => handleSort(value.id)}
                checked={sort === value.id}
              />
              <p>{value.label}</p>
            </Label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
