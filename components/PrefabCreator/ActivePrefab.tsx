import { HTMLAttributes } from "react";

import { EyeIcon, DuplicateIcon, ExclamationCircleIcon, TrashIcon } from "@heroicons/react/outline";

import { Common } from "@app/components";
import { usePrefabStore } from "@app/store";
import { Module } from "@app/types";

import cn from "classnames";

import ModuleItem from "./ModuleItem";

type ActivePrefabProps = {
	prefab: { name: string; modules: Module[]; id: number; internalId: string };
	themeColor: string;
};
type ButtonProps = {
	themeColor: string;
	variant?: "outline" | "default";
} & HTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, themeColor, variant = "default", ...restProps }) => {
	return (
		<button
			onClick={() => console.log("click")}
			className={cn(`w-7 h-7 rounded-sm bg-${themeColor}-500 transition  shadow-md `, {
				[`bg-${themeColor}-500 hover:bg-${themeColor}-600 text-white`]: variant === "default",
				[`bg-transparent border-2 border-${themeColor}-500 hover:bg-${themeColor}-500 hover:border-white text-${themeColor}-500 hover:text-white`]:
					variant === "outline",
			})}
			{...restProps}
		>
			{children}
		</button>
	);
};

const ActivePrefab: React.FC<ActivePrefabProps> = ({ prefab, themeColor }) => {
	const { setActivePrefabId } = usePrefabStore((state) => ({
		setActivePrefabId: state.setActivePrefabId,
	}));

	return (
		<>
			<Common.Header id="drag-handle" className="rounded-sm px-2 py-0 text-lg" onClick={() => setActivePrefabId(prefab.internalId)}>
				<div className="flex items-center justify-between">
					<span>{prefab.name}</span>
					<div className="flex items-center gap-x-1">
						<Button themeColor={themeColor} title="Collapse All">
							<EyeIcon className="w-full h-full p-1" />
						</Button>
						<Button themeColor={themeColor} title="Duplicate">
							<DuplicateIcon className="w-full h-full p-1" />
						</Button>
						<div className="h-6 bg-rose-600  w-0.5 rounded-full mx-1" />
						<Button themeColor={themeColor} variant="outline" title="Delete Prefab">
							<TrashIcon className="w-full h-full p-1" />
						</Button>
					</div>
				</div>
			</Common.Header>
			{prefab.modules.length > 0 ? (
				<div className="flex flex-col gap-y-1 mt-1">
					{prefab.modules.map((module) => (
						<ModuleItem themeColor={themeColor} key={module.id} moduleId={module.id} />
					))}
				</div>
			) : (
				<div className="text-white font-bold border-dashed border-2 mt-1 p-4 text-sm flex flex-col justify-center items-center">
					<ExclamationCircleIcon className="w-10 h-10" />
					<span className="w-2/3 text-center">Please add a module from the panel on the left</span>
				</div>
			)}
		</>
	);
};

export default ActivePrefab;
