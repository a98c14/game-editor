import { api } from "@core/hooks";
import { useSelectedInput } from "@prefab-editor/hooks";

const Prefabs: React.FC = () => {
    const { data: prefabs } = api.useGetPrefabs();
    const { updateInput } = useSelectedInput();

    if (!prefabs) return null;

    function handleSelect(id: number) {
        updateInput(id);
    }

    return (
        <div className="flex flex-col gap-y-px">
            {prefabs.length > 0
                ? prefabs.map((prefab) => (
                      <button
                          type="button"
                          key={prefab.id}
                          className="flex px-1 rounded-sm transition bg-zinc-800 hover:brightness-125 whitespace-nowrap truncate"
                          title={prefab.name}
                          onClick={() => handleSelect(prefab.id)}
                      >
                          {prefab.name}
                      </button>
                  ))
                : "No prefabs found"}
        </div>
    );
};

export default Prefabs;
