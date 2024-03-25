'use client'

interface CheckboxFieldProps {
    labelName?: string;
    fieldType: string;
    fieldValue?: string;
    options?: Array<string>;
    onChange: (value: string) => void;
    placeholderText?: string;
}

export default function CheckboxField({ labelName, fieldType, options, onChange }: CheckboxFieldProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    }

    return (
        <div className=" w-full my-2">
            <label className="block text-sm font-medium text-gray-900">
                {labelName}
            </label>
            <div className="relative mt-1 rounded-md">
                <ul className="grid grid-cols-3">
                    {(options)?.map((selection, index) =>

                        <li key={index}>
                            <label className='flex flex-row gap-2' key={index}>
                                <input
                                    type={fieldType}
                                    name="label"
                                    key={index}
                                    value={selection}
                                    onChange={handleChange}
                                    className="block rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {selection}
                            </label>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    )
}
