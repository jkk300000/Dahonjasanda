package com.multi.dahon.housing.model.vo;

public class HouseCalendarParam {
    private String title;
    private String category;
    private String date;
    private String info;

    public HouseCalendarParam() {
    }

    public HouseCalendarParam(String title, String category, String date, String info) {
        this.title = title;
        this.category = category;
        this.date = date;
        this.info= info;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info=info;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    @Override
    public String toString() {
        return "HouseCalendar{" +
                "title='" + title + '\'' +
                ", category='" + category + '\'' +
                ", date='" + date + '\'' +
                ", info='"+ info+ '\''+
                '}';
    }
}
