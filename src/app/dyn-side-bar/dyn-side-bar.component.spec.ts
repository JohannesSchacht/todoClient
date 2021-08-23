import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynSideBarComponent } from './dyn-side-bar.component';

describe('DynSideBarComponent', () => {
	let component: DynSideBarComponent;
	let fixture: ComponentFixture<DynSideBarComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [DynSideBarComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(DynSideBarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
