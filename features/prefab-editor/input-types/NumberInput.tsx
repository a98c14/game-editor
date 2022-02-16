import { useEffect, useState } from "react";

import { usePrefabEditorStore } from "@core/store";
import { useDebounce } from "@core/hooks";

type Props = {
    prefabId: string;
    moduleId: number;
    defaultValue: string;
};

const Number: React.FC<Props> = ({ prefabId, moduleId, defaultValue }) => {
    const updateInput = usePrefabEditorStore((state) => state.updateInputValue);
    const [value, setValue] = useState(defaultValue);
    const { debouncedValue } = useDebounce(value, 300);

    useEffect(() => {
        updateInput(prefabId, moduleId, debouncedValue);
    }, [debouncedValue]);

    return (
        <input
            type="number"
            className="w-full text-white rounded-sm pl-1 bg-zinc-700 shadow-md border border-zinc-200"
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    );
};

export default Number;
