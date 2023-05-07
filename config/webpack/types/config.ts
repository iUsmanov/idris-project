export type BuildMode = 'production' | 'development';

export interface buildPaths {
	entry: string;
	build: string;
	html: string;
}

export interface BuildOptions {
	isDev: boolean;
	mode: BuildMode;
	port: number;
	buildPaths: buildPaths;
}

export interface BuildEnv {
	mode: BuildMode;
	port: number;
}
