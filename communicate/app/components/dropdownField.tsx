'use client'

interface Country {
  value: string;
  label: string;
}
interface DropdownFieldProps {
  labelName?: string;
  fieldValue?: string;
  options?: Array<string>;
  options2?: Array<Country>;
  onChange: (value: string) => void;
}

export default function DropdownField({ labelName, fieldValue, options, options2, onChange }: DropdownFieldProps) {
  
  
  const handleChange = (e: any) => {
    onChange(e.target.value);
    console.log(`storing this value: ${e}`)
  }

  return (
    <div className=" w-full my-2">
      <label className="block text-sm font-medium text-gray-900">
        {labelName}
      </label>
      <div className="relative mt-1 rounded-md">
          <select
            onChange={handleChange}
            id="currency"
            name="currency"
            value={fieldValue}
            className="w-full rounded-md border-0 py-1.5"
          >
            <option value='placeholder'>Select</option>
            {(options)?.map((selection, index) => <option key={index}>{selection}</option>)}
            {(options2)?.map((selection, index) => <option key={index}>{selection.label}</option>)}
          </select>
      </div>
    </div>
  )
}