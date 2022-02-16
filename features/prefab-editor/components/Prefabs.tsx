import { ChevronRightIcon } from "@heroicons/react/outline";

import { usePrefabEditorStore } from "@core/store";
import { api } from "@core/hooks";
import shallow from "zustand/shallow";

const Prefab: React.FC<{ prefabId: string; prefabName: string }> = ({ prefabId, prefabName }) => {
    const { createNewRoot, setIsPrefabsModalOpen } = usePrefabEditorStore(
        (state) => ({
            createNewRoot: state.createNewRoot,
            setIsPrefabsModalOpen: state.setIsPrefabsModalOpen,
        }),
        shallow
    );

    function handleClick() {
        createNewRoot();
        setIsPrefabsModalOpen(false);
        setIsPrefabsModalOpen(false);
    }

    return (
        <div
            onClick={() => handleClick()}
            className="px-2 py-1 text-sm  shadow-md text-white min-h-5 w-full flex items-center cursor-pointer bg-zinc-800 transition hover:brightness-125 font-default"
        >
            <ChevronRightIcon className="w-4 h-4 text-white mr-1" />
            <div>{prefabName.toUpperCase()}</div>
        </div>
    );
};

const Prefabs: React.FC = () => {
    const { data: prefabs } = api.useGetPrefabs();

    return (
        <div className="flex flex-col h-full w-full justify-between">
            <div className="flex flex-col">
                <div className="flex flex-col">
                    {prefabs &&
                        Array.isArray(prefabs) &&
                        prefabs.map((prefab) => <Prefab key={prefab.id} prefabId={prefab.id.toString()} prefabName={prefab.name} />)}
                </div>
            </div>
        </div>
    );
};

export default Prefabs;
