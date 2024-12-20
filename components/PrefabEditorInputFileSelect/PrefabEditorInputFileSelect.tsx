import { DocumentTextIcon } from "@heroicons/react/solid";

import { ModuleValueType } from "@app/types";
import { usePrefabEditorSelectedInput } from "@app/hooks";

type Props = {
    type: ModuleValueType;
    themeColor: string;
    moduleId: number;
    defaultValue: number | null;
};

const FileSelectInput: React.FC<Props> = ({ type, themeColor, moduleId, defaultValue }) => {
    const { selectInput } = usePrefabEditorSelectedInput();
    return (
        <button
            type="button"
            className={`w-full h-full text-sm flex justify-center items-center rounded-sm bg-${themeColor}-500 px-2 transition hover:bg-${themeColor}-600`}
            onClick={() => selectInput(moduleId)}
        >
            <span title={defaultValue ? defaultValue.toString() : "Choose a file"} className="max-w-[112px] truncate">
                {defaultValue ? defaultValue : "CHOOSE A FILE"}
            </span>
            {defaultValue && <DocumentTextIcon className="ml-1 w-4 h-4 mb-px" />}
        </button>
    );
};

export default FileSelectInput;
