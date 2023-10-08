from django import forms


class TextInputForm(forms.Form):
    text_input = forms.CharField(widget=forms.Textarea)
