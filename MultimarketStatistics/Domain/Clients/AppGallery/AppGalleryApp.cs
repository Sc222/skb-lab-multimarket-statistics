using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;

namespace Domain.Clients.AppGallery
{
    public class LabelName
    {
        [JsonProperty("name")]
        public string Name;

        [JsonProperty("type")]
        public int Type;
    }

    public class ExIcons
    {
    }

    public class List
    {
        [JsonProperty("hide")]
        public int Hide;

        [JsonProperty("name")]
        public string Name;

        [JsonProperty("text")]
        public string Text;

        [JsonProperty("type")]
        public int Type;
    }

    public class DataList
    {
        [JsonProperty("isFavoriteApp")]
        public int IsFavoriteApp;

        [JsonProperty("sha256")]
        public string Sha256;

        [JsonProperty("sizeDesc")]
        public string SizeDesc;

        [JsonProperty("icon")]
        public string Icon;

        [JsonProperty("detailId")]
        public string DetailId;

        [JsonProperty("targetSDK")]
        public int TargetSDK;

        [JsonProperty("obbSize")]
        public int ObbSize;

        [JsonProperty("versionName")]
        public string VersionName;

        [JsonProperty("shareType")]
        public int ShareType;

        [JsonProperty("detailType")]
        public int DetailType;

        [JsonProperty("dependentedApps")]
        public List<object> DependentedApps;

        [JsonProperty("editorDescribe")]
        public string EditorDescribe;

        [JsonProperty("shareContent")]
        public string ShareContent;

        [JsonProperty("downurl")]
        public string Downurl;

        [JsonProperty("price")]
        public object Price;

        [JsonProperty("relatedDetailId")]
        public string RelatedDetailId;

        [JsonProperty("isGradeAdapt")]
        public int IsGradeAdapt;

        [JsonProperty("btnDisable")]
        public int BtnDisable;

        [JsonProperty("package")]
        public string Package;

        [JsonProperty("productId")]
        public object ProductId;

        [JsonProperty("fullSize")]
        public int FullSize;

        [JsonProperty("trackId")]
        public object TrackId;

        [JsonProperty("nonAdaptType")]
        public int NonAdaptType;

        [JsonProperty("buttonTextType")]
        public int ButtonTextType;

        [JsonProperty("isExt")]
        public int IsExt;

        [JsonProperty("appoid")]
        public string Appoid;

        [JsonProperty("versionCode")]
        public string VersionCode;

        [JsonProperty("packingType")]
        public int PackingType;

        [JsonProperty("commentCount")]
        public int CommentCount;

        [JsonProperty("showDisclaimer")]
        public int ShowDisclaimer;

        [JsonProperty("ctype")]
        public int Ctype;

        [JsonProperty("size")]
        public int Size;

        [JsonProperty("bundleSize")]
        public int BundleSize;

        [JsonProperty("portalUrl")]
        public string PortalUrl;

        [JsonProperty("appid")]
        public string Appid;

        [JsonProperty("minAge")]
        public int MinAge;

        [JsonProperty("name")]
        public string Name;

        [JsonProperty("maple")]
        public object Maple;

        [JsonProperty("localPrice")]
        public object LocalPrice;

        [JsonProperty("md5")]
        public string Md5;

        [JsonProperty("followState")]
        public int? FollowState;

        [JsonProperty("labelNames")]
        public List<LabelName> LabelNames;

        [JsonProperty("safeLabels")]
        public List<object> SafeLabels;

        [JsonProperty("icoUri")]
        public string IcoUri;

        [JsonProperty("exIcons")]
        public ExIcons ExIcons;

        [JsonProperty("stars")]
        public double? Stars;

        [JsonProperty("sectionId")]
        public int? SectionId;

        [JsonProperty("labels")]
        public List<string> Labels;

        [JsonProperty("gradeIcon")]
        public string GradeIcon;

        [JsonProperty("appType")]
        public int? AppType;

        [JsonProperty("intro")]
        public string Intro;

        [JsonProperty("supportWatch")]
        public int? SupportWatch;

        [JsonProperty("gradeDesc")]
        public string GradeDesc;

        [JsonProperty("gradeCount")]
        public int? GradeCount;

        [JsonProperty("images")]
        public List<string> Images;

        [JsonProperty("imageCompress")]
        public List<string> ImageCompress;

        [JsonProperty("imageTag")]
        public string ImageTag;

        [JsonProperty("tariffDesc")]
        public string TariffDesc;

        [JsonProperty("releaseDate")]
        public string ReleaseDate;

        [JsonProperty("title")]
        public string Title;

        [JsonProperty("version")]
        public string Version;

        [JsonProperty("devVipType")]
        public string DevVipType;

        [JsonProperty("developer")]
        public string Developer;

        [JsonProperty("style")]
        public int? Style;

        [JsonProperty("body")]
        public string Body;

        [JsonProperty("appIntro")]
        public string AppIntro;

        [JsonProperty("list")]
        public List<List> List;
    }

    public class ComponentData
    {
        [JsonProperty("customDisplayField")]
        public int CustomDisplayField;

        [JsonProperty("customDisplayField1")]
        public int CustomDisplayField1;
    }

    public class LayoutData
    {
        [JsonProperty("listId")]
        public string ListId;

        [JsonProperty("dataList-type")]
        public int DataListType;

        [JsonProperty("swipeDownRefresh")]
        public int SwipeDownRefresh;

        [JsonProperty("closable")]
        public int Closable;

        [JsonProperty("dataList")]
        public List<DataList> DataList;

        [JsonProperty("isUpdatableFilter")]
        public int IsUpdatableFilter;

        [JsonProperty("isInstalledFilter")]
        public int IsInstalledFilter;

        [JsonProperty("maxDisplayTime")]
        public string MaxDisplayTime;

        [JsonProperty("componentData")]
        public ComponentData ComponentData;

        [JsonProperty("layoutId")]
        public int LayoutId;

        [JsonProperty("layoutName")]
        public string LayoutName;
    }

    public class TabInfo
    {
        [JsonProperty("tabId")]
        public string TabId;

        [JsonProperty("statKey")]
        public string StatKey;

        [JsonProperty("tabEnName")]
        public string TabEnName;

        [JsonProperty("titleType")]
        public string TitleType;

        [JsonProperty("tabName")]
        public string TabName;

        [JsonProperty("returnTabId")]
        public string ReturnTabId;

        [JsonProperty("swipeDownRefresh")]
        public int SwipeDownRefresh;

        [JsonProperty("actionBarStyle")]
        public int ActionBarStyle;

        [JsonProperty("currentTag")]
        public string CurrentTag;

        [JsonProperty("realTabId")]
        public string RealTabId;

        [JsonProperty("hasChild")]
        public int HasChild;

        [JsonProperty("funFlag")]
        public string FunFlag;

        [JsonProperty("style")]
        public int Style;

        [JsonProperty("isSupShake")]
        public int IsSupShake;

        [JsonProperty("titleIconType")]
        public int TitleIconType;

        [JsonProperty("contentType")]
        public string ContentType;

        [JsonProperty("marginTop")]
        public int MarginTop;

        [JsonProperty("fixedSort")]
        public int FixedSort;
    }

    public class Layout
    {
        [JsonProperty("maxRows")]
        public int MaxRows;

        [JsonProperty("layoutId")]
        public int LayoutId;

        [JsonProperty("layoutName")]
        public string LayoutName;
    }

    public class Root
    {
        [JsonProperty("statKey")]
        public string StatKey;

        [JsonProperty("titleType")]
        public string TitleType;

        [JsonProperty("layoutData")]
        public List<LayoutData> LayoutData;

        [JsonProperty("tabInfo")]
        public List<TabInfo> TabInfo;

        [JsonProperty("sortInfo")]
        public List<object> SortInfo;

        [JsonProperty("returnTabId")]
        public string ReturnTabId;

        [JsonProperty("hasNextPage")]
        public int HasNextPage;

        [JsonProperty("count")]
        public int Count;

        [JsonProperty("layout")]
        public List<Layout> Layout;

        [JsonProperty("isSupSearch")]
        public int IsSupSearch;

        [JsonProperty("name")]
        public string Name;

        [JsonProperty("totalPages")]
        public int TotalPages;

        [JsonProperty("titleIconType")]
        public int TitleIconType;

        [JsonProperty("contentType")]
        public int ContentType;

        [JsonProperty("marginTop")]
        public int MarginTop;

        [JsonProperty("rtnCode")]
        public int RtnCode;

        [JsonProperty("rspKey")]
        public string RspKey;
    }
}
