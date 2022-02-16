import { useState } from "react";

import cn from "classnames";
import { ChevronRightIcon, TrashIcon } from "@heroicons/react/outline";

import { ModuleValueType, ApiModule } from "@app/types";
import { stringUtils } from "@core/utils";

import DynamicInput from "./DynamicInput";
import { useSelectedPrefab } from "@prefab-editor/hooks";

const ChildrenModules: React.FC<{ themeColor: string; child: ApiModule }> = ({ themeColor, child: module }) => {
    function toggleExpand() {
        setIsExpanded((prev) => !prev);
    }

    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="w-full flex flex-col">
            <div className="w-full flex items-center">
                <span className="w-full text-left uppercase text-sm font-bold">{stringUtils.formatCamelCase(module.name)}</span>
                <button
                    type="button"
                    className={`min-w-[20px] min-h-[20px] bg-${themeColor}-600 border-2 border-white rounded-sm shadow-md mr-px`}
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleExpand();
                    }}
                >
                    <ChevronRightIcon
                        className={cn(`transition-transform`, {
                            "rotate-90": isExpanded,
                        })}
                    />
                </button>
            </div>

            {isExpanded && (
                <div className="flex h-full w-full">
                    <hr className="w-0.5 h-auto bg-zinc-200 rounded-full my-0.5 ml-2" />
                    <div className="ml-1 rounded-sm  my-0.5 pl-1  w-full">
                        <div className="flex flex-col w-full h-full items-start">
                            {module.children && module.children.map((child) => <ModuleInput themeColor={themeColor} key={child.id} child={child} />)}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const ModuleInput: React.FC<{ themeColor: string; child: ApiModule }> = ({ themeColor, child: module }) => {
    const hasChildren = module.valueType === ModuleValueType.Object;
    return (
        <div className="flex flex-col w-full bg-zinc-900 rounded-sm pl-1 pr-0.5 py-0.5">
            {hasChildren ? (
                <ChildrenModules themeColor={themeColor} child={module} />
            ) : (
                <div className="flex w-full">
                    <span className="w-full text-left uppercase text-sm font-bold">{stringUtils.formatCamelCase(module.name)}</span>
                    <DynamicInput module={module} />
                </div>
            )}
        </div>
    );
};

const ModuleItem: React.FC<{ themeColor: string; module: ApiModule }> = ({ themeColor, module }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { removeModule } = useSelectedPrefab();
    const hasChildren = module.children && module.children.length > 0;

    function toggleExpand() {
        if (!hasChildren) return;
        setIsExpanded((prev) => !prev);
    }

    if (!module) return null;

    return (
        <div className="bg-zinc-800  font-default  rounded-sm py-0.5 pl-1.5 pr-0.5 text-white flex items-center flex-col">
            <div
                className={cn("flex items-center justify-between w-full", {
                    "cursor-pointer": hasChildren,
                    "cursor-default": !hasChildren,
                })}
                onClick={() => toggleExpand()}
            >
                <div className="text-sm font-bold uppercase mr-2">{stringUtils.formatCamelCase(module.name)}</div>
                <div className="flex items-center">
                    <TrashIcon
                        className="bg-red-600 p-0.5 w-5 h-5 shadow-md rounded-sm text-sm font-bold font-defaulttransition-colors hover:bg-red-700 border-2 cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation();
                            removeModule(module.id);
                        }}
                    />
                    {hasChildren && (
                        <button
                            type="button"
                            className={`w-5 h-5 bg-${themeColor}-600 border-2 border-white rounded-sm shadow-md ml-1`}
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleExpand();
                            }}
                        >
                            <ChevronRightIcon
                                className={cn(`transition-transform`, {
                                    "rotate-90": isExpanded,
                                })}
                            />
                        </button>
                    )}
                </div>
            </div>

            {isExpanded && (
                <>
                    <hr className="text-zinc-600 h-px w-full mt-0.5" />
                    <div className="w-full flex flex-col px-0.5 pb-0.5">
                        <div className="flex flex-col w-full h-full items-start gap-y-px mt-1">
                            {module.children && module.children.map((child) => <ModuleInput themeColor={themeColor} key={child.id} child={child} />)}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ModuleItem;
