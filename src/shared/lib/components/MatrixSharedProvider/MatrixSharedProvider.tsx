import { AppLinkMatrixProps } from '@/shared/components/AppLink/Matrix/AppLink';
import { ButtonMatrixProps } from '@/shared/components/Button/Matrix/Button';
import { CardMatrixProps } from '@/shared/components/Card/Matrix/Card';
import { CodeMatrixProps } from '@/shared/components/Code/Matrix/Code';
import { IconMatrixProps } from '@/shared/components/Icon/Matrix/Icon';
import { InputMatrixProps } from '@/shared/components/Input/Matrix/Input';
import { DropdownMatrixProps } from '@/shared/components/Popups/components/Dropdown/Matrix/Dropdown';
import { ListBoxMatrixProps } from '@/shared/components/Popups/components/ListBox/Matrix/ListBox';
import { PopoverMatrixProps } from '@/shared/components/Popups/components/Popover/Matrix/Popover';
import { SkeletonMatrixProps } from '@/shared/components/Skeleton/Matrix/Skeleton';
import { StarRatingMatrixProps } from '@/shared/components/StarRating/Matrix/StarRating';
import { TabsMatrixProps } from '@/shared/components/Tabs/Matrix/Tabs';
import { TextMatrixProps } from '@/shared/components/Text/Matrix/Text';
import {
	FC,
	MemoExoticComponent,
	ReactNode,
	createContext,
	memo,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';

type AppLinkType = FC<AppLinkMatrixProps>;
type TabsType = <T extends string>(props: TabsMatrixProps<T>) => JSX.Element;
type ButtonType = FC<ButtonMatrixProps>;
type CardType = FC<CardMatrixProps>;
type CodeType = FC<CodeMatrixProps>;
type IconType = MemoExoticComponent<(props: IconMatrixProps) => JSX.Element>;
type InputType = FC<InputMatrixProps>;
type SkeletonType = FC<SkeletonMatrixProps>;
type StarRatingType = FC<StarRatingMatrixProps>;
type TextType = FC<TextMatrixProps>;
type DropdownType = FC<DropdownMatrixProps>;
type ListBoxType = FC<ListBoxMatrixProps>;
type PopoverType = FC<PopoverMatrixProps>;

interface MatrixSharedContextPayload {
	AppLink?: AppLinkType;
	Button?: ButtonType;
	Card?: CardType;
	Code?: CodeType;
	Icon?: IconType;
	Input?: InputType;
	Skeleton?: SkeletonType;
	StarRating?: StarRatingType;
	Tabs?: TabsType;
	Text?: TextType;
	Dropdown?: DropdownType;
	ListBox?: ListBoxType;
	Popover?: PopoverType;
	// ===
	isLoaded?: boolean;
}

interface MatrixSharedProvider {
	children: ReactNode;
}

const MatrixSharedContext = createContext<MatrixSharedContextPayload>({});

const getAsyncMatrixSharedModules = async () => {
	return Promise.all([
		import('@/shared/components/AppLink/Matrix/AppLink.async'),
		import('@/shared/components/Button/Matrix/Button.async'),
		import('@/shared/components/Card/Matrix/Card.async'),
		import('@/shared/components/Code/Matrix/Code.async'),
		import('@/shared/components/Icon/Matrix/Icon.async'),
		import('@/shared/components/Input/Matrix/Input.async'),
		import('@/shared/components/Skeleton/Matrix/Skeleton.async'),
		import('@/shared/components/StarRating/Matrix/StarRating.async'),
		import('@/shared/components/Tabs/Matrix/Tabs.async'),
		import('@/shared/components/Text/Matrix/Text.async'),
		import('@/shared/components/Popups/components/Dropdown/Matrix/Dropdown.async'),
		import('@/shared/components/Popups/components/ListBox/Matrix/ListBox.async'),
		import('@/shared/components/Popups/components/Popover/Matrix/Popover.async'),
	]);
};

export const useMatrixSharedComponents = () => {
	return useContext(MatrixSharedContext) as Required<MatrixSharedContextPayload>;
};

export const MatrixSharedProvider = memo((props: MatrixSharedProvider) => {
	const { children } = props;
	const AppLinkRef = useRef<AppLinkType>();
	const ButtonRef = useRef<ButtonType>();
	const CardRef = useRef<CardType>();
	const CodeRef = useRef<CodeType>();
	const IconRef = useRef<IconType>();
	const InputRef = useRef<InputType>();
	const SkeletonRef = useRef<SkeletonType>();
	const StarRatingRef = useRef<StarRatingType>();
	const TabsRef = useRef<TabsType>();
	const TextRef = useRef<TextType>();
	const DropdownRef = useRef<DropdownType>();
	const ListBoxRef = useRef<ListBoxType>();
	const PopoverRef = useRef<PopoverType>();
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		getAsyncMatrixSharedModules().then(
			([
				AppLink,
				Button,
				Card,
				Code,
				Icon,
				Input,
				Skeleton,
				StarRating,
				Tabs,
				Text,
				Dropdown,
				ListBox,
				Popover,
			]) => {
				AppLinkRef.current = AppLink.AppLinkAsync;
				ButtonRef.current = Button.ButtonAsync;
				CardRef.current = Card.CardAsync;
				CodeRef.current = Code.CodeAsync;
				IconRef.current = Icon.IconAsync;
				InputRef.current = Input.InputAsync;
				SkeletonRef.current = Skeleton.SkeletonAsync;
				StarRatingRef.current = StarRating.StarRatingAsync;
				TabsRef.current = Tabs.TabsAsync;
				TextRef.current = Text.TextAsync;
				DropdownRef.current = Dropdown.DropdownAsync;
				ListBoxRef.current = ListBox.ListBoxAsync;
				PopoverRef.current = Popover.PopoverAsync;
				// =======
				setIsLoaded(true);
			}
		);
	}, []);

	const value = useMemo(
		() => ({
			AppLink: AppLinkRef.current,
			Button: ButtonRef.current,
			Card: CardRef.current,
			Code: CodeRef.current,
			Icon: IconRef.current,
			Input: InputRef.current,
			Skeleton: SkeletonRef.current,
			StarRating: StarRatingRef.current,
			Tabs: TabsRef.current,
			Text: TextRef.current,
			Dropdown: DropdownRef.current,
			ListBox: ListBoxRef.current,
			Popover: PopoverRef.current,
			// ====
			isLoaded,
		}),
		[isLoaded]
	);

	return <MatrixSharedContext.Provider value={value}>{children}</MatrixSharedContext.Provider>;
});
