import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'todo-dyn-side-bar',
	templateUrl: './dyn-side-bar.component.html',
	styleUrls: ['./dyn-side-bar.component.scss']
})
export class DynSideBarComponent implements OnInit {
	// tslint:disable-next-line: variable-name
	_hiddenState = true;
	hidden = true;
	tempVisible = false;
	buttonText = this._hiddenState ? '»' : '«';

	constructor() {}

	set hiddenState(value: boolean) {
		this._hiddenState = this.hidden = value;
		this.buttonText = this._hiddenState ? '»' : '«'; // '\u00BB' : '\u00AB'
		if (!value) {
			this.tempVisible = false;
		}
	}
	get hiddenState(): boolean {
		return this._hiddenState;
	}

	mouseoutSideBar(): void {
		if (this.hiddenState) {
			this.tempVisible = true;
			this.hidden = true;
		} else {
			this.tempVisible = false;
			this.hidden = false;
		}
	}

	mouseoverSideBar(): void {
		if (this.hiddenState) {
			this.tempVisible = true;
			this.hidden = false;
		}
	}

	log(s: string): void {
		console.log(s);
	}

	ngOnInit(): void {}
}
