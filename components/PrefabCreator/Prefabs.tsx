import { PlusIcon } from "@heroicons/react/outline";

import { Common } from "@app/components";
import { usePrefabStore } from "@app/store";
import { Prefab as PrefabType } from "@app/types";

import cn from "classnames";

const Prefab: React.FC<{ prefab: PrefabType }> = ({ prefab }) => {
	const { activePrefabId, setActivePrefabId } = usePrefabStore((state) => ({
		activePrefabId: state.activePrefabId,
		setActivePrefabId: state.setActivePrefabId,
	}));

	return (
		<div
			onClick={() => setActivePrefabId(prefab.internalId)}
			className={cn(
				"px-2 py-1 text-sm rounded-sm shadow-md text-white min-h-5 w-full flex items-center cursor-pointer  transition hover:bg-zinc-600",
				{
					"bg-zinc-600": activePrefabId === prefab.internalId,
					"bg-zinc-700": activePrefabId !== prefab.internalId,
				}
			)}
		>
			<div>{prefab.name.toUpperCase()}</div>
		</div>
	);
};

const Prefabs: React.FC = () => {
	const { prefabs, addPrefab } = usePrefabStore((state) => ({ prefabs: state.prefabs, addPrefab: state.createPrefab }));

	return (
		<div className="w-full h-full p-2 overflow-y-auto card-secondary flex flex-col justify-between">
			<div className="flex flex-col">
				<Common.Header>Prefabs</Common.Header>
				<div className="mt-1 flex flex-col gap-y-1">
					{prefabs.map((prefab) => (
						<Prefab key={prefab.internalId} prefab={prefab} />
					))}
				</div>
			</div>
			<div className="flex">
				<button
					className="bg-emerald-600 rounded-sm text-white px-2 py-1 text-sm font-default font-bold shadow-md flex items-center transition hover:bg-emerald-700"
					onClick={() => addPrefab()}
				>
					ADD NEW PREFAB
					<PlusIcon className="w-4 h-4 ml-2 text-emerald-600 bg-white rounded-sm" />
				</button>
			</div>
		</div>
	);
};

export default Prefabs;
