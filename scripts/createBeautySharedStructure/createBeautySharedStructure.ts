// npx ts-node ./scripts/createBeautySharedStructure/createBeautySharedStructure.ts
import { log } from 'console';
import path from 'path';
import { Project } from 'ts-morph';

const project = new Project({});

project.addSourceFilesAtPaths('src/shared/components/**/*.{ts,tsx,scss}');

const sourceFiles = project.getSourceFiles();

// const componentsDir = path.join(__dirname, '..', '..', 'src', 'shared', 'components');

const rootDirs = project.getRootDirectories();

const componentsDir = rootDirs.filter((rootDir) => {
	const dirName = rootDir.getBaseName();
	if (
		dirName !== 'DeviceViews' &&
		dirName !== 'Stack' &&
		dirName !== 'Overlay' &&
		dirName !== 'Drawer' &&
		dirName !== 'Modal' &&
		dirName !== 'Portal' &&
		dirName !== 'AppImage' &&
		dirName !== 'Avatar' &&
		dirName !== 'Glinter' &&
		dirName !== 'Shimmer' &&
		dirName !== 'Select' &&
		dirName !== 'Loader' &&
		dirName !== 'AppLogo'
	) {
		return true;
	}
});

componentsDir.forEach((rootDir) => {
	const dirName = rootDir.getBaseName();
	if (dirName !== 'Button') return;
	const createdBeautyDir = rootDir.createDirectory('Beauty');
	const createdMatrixDir = rootDir.createDirectory('Matrix');
	rootDir.copy(createdBeautyDir.getPath());
});

// sourceFiles.forEach((sourceFile) => {});

project.save();
