import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { ContainerCardProps } from "@/types";
import { CubeIcon } from "@radix-ui/react-icons";
import { defaultOrValue } from "@/utils";

export function ContainerCard(containerData: ContainerCardProps) {
  const {
    name,
    image,
    imagePullPolicy,
    lastRestart,
    ready,
    restartReason,
    restarts,
    started,
    terminationMessagePolicy
  } = containerData;
  return (
    <Card className="shadow-none rounded-lg border-dashed">
      <CardHeader className="border-b pb-2">
        <CardTitle>{name}</CardTitle>
        <CardDescription className="flex items-center">
          <CubeIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          {image}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-2 pt-4">
        <div className="p-2 -mx-2 flex items-start space-x-4 rounded-md p-2 transition-all">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">状态</p>
            <p className="text-sm font-medium leading-none">
              <span className={started ? 'text-emerald-400' : 'text-red-400'}>{!started ? '未' : ''}启动</span>
              <span className={`pl-1 ${ready ? 'text-emerald-300' : 'text-red-300'}`}>{!ready ? '未' : ''}就绪</span>
            </p>
          </div>
        </div>
        <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">重启原因</p>
            <p className="text-sm font-medium leading-none">{defaultOrValue(restartReason)}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">重启次数</p>
              <p className="text-sm font-medium leading-none">{defaultOrValue(restarts)}</p>
            </div>
          </div>
          <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">上次重启时间</p>
              <p className="text-sm font-medium leading-none">{defaultOrValue(lastRestart)}</p>
            </div>
          </div>
          <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">镜像拉取策略</p>
              <p className="text-sm font-medium leading-none">{defaultOrValue(imagePullPolicy)}</p>
            </div>
          </div>
          <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">终止消息策略</p>
              <p className="text-sm font-medium leading-none">{defaultOrValue(terminationMessagePolicy)}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}