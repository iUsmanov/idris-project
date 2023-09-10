import { AppLinkBeautyProps } from '@/shared/components/AppLink/Beauty/AppLink';
import { ButtonBeautyProps } from '@/shared/components/Button/Beauty/Button';
import { CardBeautyProps } from '@/shared/components/Card/Beauty/Card';
import { CodeBeautyProps } from '@/shared/components/Code/Beauty/Code';
import { IconBeautyProps } from '@/shared/components/Icon/Beauty/Icon';
import { InputBeautyProps } from '@/shared/components/Input/Beauty/Input';
import { DropdownBeautyProps } from '@/shared/components/Popups/components/Dropdown/Beauty/Dropdown';
import { ListBoxBeautyProps } from '@/shared/components/Popups/components/ListBox/Beauty/ListBox';
import { PopoverBeautyProps } from '@/shared/components/Popups/components/Popover/Beauty/Popover';
import { SkeletonBeautyProps } from '@/shared/components/Skeleton/Beauty/Skeleton';
import { StarRatingBeautyProps } from '@/shared/components/StarRating/Beauty/StarRating';
import { TabsBeautyProps } from '@/shared/components/Tabs/Beauty/Tabs';
import { TextBeautyProps } from '@/shared/components/Text/Beauty/Text';
import {
	FC,
	ReactNode,
	createContext,
	memo,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';

type AppLinkType = FC<AppLinkBeautyProps>;
type TabsType = FC<TabsBeautyProps>;
type ButtonType = FC<ButtonBeautyProps>;
type CardType = FC<CardBeautyProps>;
type CodeType = FC<CodeBeautyProps>;
type IconType = FC<IconBeautyProps>;
type InputType = FC<InputBeautyProps>;
type SkeletonType = FC<SkeletonBeautyProps>;
type StarRatingType = FC<StarRatingBeautyProps>;
type TextType = FC<TextBeautyProps>;
type DropdownType = FC<DropdownBeautyProps>;
type ListBoxType = FC<ListBoxBeautyProps>;
type PopoverType = FC<PopoverBeautyProps>;

interface BeautySharedContextPayload {
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

interface BeautySharedProvider {
	children: ReactNode;
}

const BeautySharedContext = createContext<BeautySharedContextPayload>({});

const getAsyncBeautySharedModules = async () => {
	return Promise.all([
		import('@/shared/components/AppLink/Beauty/AppLink.async'),
		import('@/shared/components/Button/Beauty/Button.async'),
		import('@/shared/components/Card/Beauty/Card.async'),
		import('@/shared/components/Code/Beauty/Code.async'),
		import('@/shared/components/Icon/Beauty/Icon.async'),
		import('@/shared/components/Input/Beauty/Input.async'),
		import('@/shared/components/Skeleton/Beauty/Skeleton.async'),
		import('@/shared/components/StarRating/Beauty/StarRating.async'),
		import('@/shared/components/Tabs/Beauty/Tabs.async'),
		import('@/shared/components/Text/Beauty/Text.async'),
		import('@/shared/components/Popups/components/Dropdown/Beauty/Dropdown.async'),
		import('@/shared/components/Popups/components/ListBox/Beauty/ListBox.async'),
		import('@/shared/components/Popups/components/Popover/Beauty/Popover.async'),
	]);
};

export const useBeautySharedComponents = () => {
	return useContext(BeautySharedContext) as Required<BeautySharedContextPayload>;
};

export const BeautySharedProvider = memo((props: BeautySharedProvider) => {
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
		getAsyncBeautySharedModules().then(
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

	return <BeautySharedContext.Provider value={value}>{children}</BeautySharedContext.Provider>;
});
