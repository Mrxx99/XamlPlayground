import { dotnet } from './dotnet.js'
import { registerAvaloniaModule } from './avalonia.js';

const is_browser = typeof window != "undefined";
if (!is_browser) throw new Error(`Expected to be running in a browser`);

const dotnetRuntime = await dotnet
    .withDiagnosticTracing(false)
    .withApplicationArgumentsFromQuery()
    .create();

await registerAvaloniaModule(dotnetRuntime);

const config = dotnetRuntime.getConfig();

await dotnetRuntime.runMainAndExit(config.mainAssemblyName, [window.location.pathname]);
