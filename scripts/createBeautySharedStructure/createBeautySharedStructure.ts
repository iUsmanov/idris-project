// npx ts-node ./scripts/createBeautySharedStructure/createBeautySharedStructure.ts
import { log } from 'console';
import path from 'path';
import { scssFileText } from '../createBeautyStructure/filesStructures/scssFileText';
import { storyFileText } from '../createBeautyStructure/filesStructures/storyFileText';
import { Directory, Project, SourceFile } from 'ts-morph';
import { mainFileText, mainMatrixFileEnd } from './filesStructures/mainFileText';
import { asyncFileText } from './filesStructures/asyncFileText';
import { toggleMainFile } from './filesStructures/toggleMainFile';

function getPath(file: SourceFile, styleDir: string): string {
	const filePath = file.getFilePath();
	const filePathArray = filePath.split('/');
	const firsrPart = filePathArray.slice(0, 9);
	const secondPart = filePathArray.slice(9);
	const needPath = firsrPart.concat(styleDir, secondPart).join('/');

	return needPath;
}

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
	// if (dirName !== 'Button') return;
	const beautyDir = rootDir.createDirectory('Beauty');
	const matrixDir = rootDir.createDirectory('Matrix');

	const rootDirAllFiles = rootDir.getDescendantSourceFiles();
	rootDirAllFiles.forEach((file) => {
		const fileName = file.getBaseName();
		if (fileName === 'index.ts') return;
		const fileText = file.getText();
		const newMatrixFilePath = getPath(file, 'Matrix');
		if (fileName.includes('.tsx') && !fileName.includes('.test.')) {
			const mainFile = project.createSourceFile(
				newMatrixFilePath,
				mainMatrixFileEnd(dirName, fileText)
			);
			const intf = mainFile.getInterface(`${dirName}Props`);
			intf?.rename(`${dirName}MatrixProps`);
			intf?.setIsExported(true);
		} else {
			project.createSourceFile(newMatrixFilePath, fileText);
		}

		const newBeautyFilePath = getPath(file, 'Beauty');

		if (fileName.includes('.stories.')) {
			project.createSourceFile(newBeautyFilePath, storyFileText(dirName, 'shared'));
		} else if (fileName.includes('.scss')) {
			project.createSourceFile(newBeautyFilePath, scssFileText(dirName));
		} else if (fileName.includes('.test.')) {
			project.createSourceFile(newBeautyFilePath, '');
		} else if (fileName.includes('.tsx')) {
			project.createSourceFile(newBeautyFilePath, mainFileText(dirName, 'Beauty'));
		}
	});

	const dirs = rootDir.getDescendantDirectories();
	dirs.forEach((myDir) => {
		const myDirPath = myDir.getPath();
		const inMatrix = myDirPath.includes('Matrix');
		const inBeauty = myDirPath.includes('Beauty');
		if (!inMatrix && !inBeauty) return;
		const myDirFiles = myDir.getSourceFiles();

		let hasTsxFile = false;
		myDirFiles.forEach((file) => {
			if (file.getBaseName().includes('.tsx')) {
				hasTsxFile = true;
			}
		});

		if (!hasTsxFile) return;

		myDir.createSourceFile(
			`${dirName}.async.tsx`,
			asyncFileText(dirName, inMatrix ? 'Matrix' : 'Beauty')
		);
	});

	rootDir.getSourceFile(`${dirName}.module.scss`)?.delete();
	rootDir.getSourceFile(`${dirName}.test.tsx`)?.removeText();

	const storyFile = rootDir.getSourceFile(`${dirName}.stories.ts`)?.removeText();
	storyFile?.addStatements(storyFileText(dirName, 'shared'));

	const tsxFile = rootDir.getSourceFile(`${dirName}.tsx`)?.removeText();
	tsxFile?.addStatements(toggleMainFile(dirName));
});

project.save();
